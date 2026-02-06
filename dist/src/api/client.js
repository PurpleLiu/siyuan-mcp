/**
 * 思源笔记 API 客户端
 * 负责底层的 HTTP 请求封装
 */
export class SiyuanApiError extends Error {
    endpoint;
    code;
    status;
    constructor(message, endpoint, code, status) {
        super(message);
        this.endpoint = endpoint;
        this.code = code;
        this.status = status;
        this.name = 'SiyuanApiError';
    }
}
export class SiyuanClient {
    config;
    constructor(config) {
        this.config = config;
    }
    /**
     * 发送请求到思源笔记 API
     * @param endpoint API 端点
     * @param data 请求数据
     * @returns API 响应
     */
    async request(endpoint, data) {
        const retry = normalizeRetryOptions(this.config.retry);
        let attempt = 0;
        while (true) {
            const controller = this.config.timeoutMs ? new AbortController() : undefined;
            const timeoutId = this.config.timeoutMs
                ? setTimeout(() => controller?.abort(), this.config.timeoutMs)
                : undefined;
            try {
                if (this.config.verbose) {
                    console.error('[SiYuan-MCP] [DEBUG] Request', endpoint, data ? { ...data } : undefined);
                }
                const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${this.config.token}`,
                    },
                    body: data ? JSON.stringify(data) : undefined,
                    signal: controller?.signal,
                });
                if (!response.ok) {
                    const error = new SiyuanApiError(`HTTP ${response.status} ${response.statusText}`, endpoint, undefined, response.status);
                    if (shouldRetryStatus(response.status, retry) && attempt < retry.retries) {
                        await sleep(getBackoffDelayMs(attempt, retry, response));
                        attempt += 1;
                        continue;
                    }
                    throw error;
                }
                const json = (await response.json());
                if (this.config.verbose) {
                    console.error('[SiYuan-MCP] [DEBUG] Response', endpoint, {
                        code: json.code,
                        msg: json.msg,
                    });
                }
                if (json.code !== 0) {
                    throw new SiyuanApiError(`API error (code ${json.code}): ${json.msg || 'Unknown error'}`, endpoint, json.code, response.status);
                }
                return json;
            }
            catch (error) {
                const isTimeout = error instanceof Error && error.name === 'AbortError';
                const isNetwork = !(error instanceof SiyuanApiError);
                if ((isTimeout || isNetwork) && attempt < retry.retries) {
                    const reason = isTimeout ? 'timeout' : 'network';
                    if (shouldRetryReason(reason, retry)) {
                        await sleep(getBackoffDelayMs(attempt, retry));
                        attempt += 1;
                        continue;
                    }
                }
                if (error instanceof SiyuanApiError) {
                    throw error;
                }
                throw new SiyuanApiError(`Request failed: ${error instanceof Error ? error.message : String(error)}`, endpoint);
            }
            finally {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
            }
        }
    }
    /**
     * 更新配置
     */
    updateConfig(config) {
        this.config = { ...this.config, ...config };
    }
    /**
     * 获取当前配置
     */
    getConfig() {
        return { ...this.config };
    }
}
function normalizeRetryOptions(options) {
    return {
        retries: options?.retries ?? 2,
        minDelayMs: options?.minDelayMs ?? 200,
        maxDelayMs: options?.maxDelayMs ?? 2000,
        retryOn: options?.retryOn ?? ['network', 'timeout', '5xx', '429'],
    };
}
function shouldRetryReason(reason, options) {
    return options.retryOn.includes(reason);
}
function shouldRetryStatus(status, options) {
    if (status === 429) {
        return options.retryOn.includes('429');
    }
    if (status >= 500 && status <= 599) {
        return options.retryOn.includes('5xx');
    }
    return false;
}
function getBackoffDelayMs(attempt, options, response) {
    const retryAfter = response?.headers?.get?.('Retry-After');
    if (retryAfter) {
        const retryAfterMs = Number(retryAfter) * 1000;
        if (Number.isFinite(retryAfterMs) && retryAfterMs > 0) {
            return retryAfterMs;
        }
    }
    const base = Math.min(options.maxDelayMs, options.minDelayMs * Math.pow(2, attempt));
    const jitter = Math.floor(Math.random() * Math.min(100, base));
    return base + jitter;
}
async function sleep(ms) {
    if (ms <= 0)
        return;
    await new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=client.js.map
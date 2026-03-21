export async function kvGet(env, key) {
  return await env.MODULES_KV.get(key);
}

export async function kvPut(env, key, value) {
  return await env.MODULES_KV.put(key, value);
}

export async function kvDelete(env, key) {
  return await env.MODULES_KV.delete(key);
}

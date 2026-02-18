const API = process.env.NEXT_PUBLIC_API_URL!

export async function api<T>(
  url: string,
  method: string,
  data?: unknown,
  token?: string | null
): Promise<T> {

  const res = await fetch(`${API}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    credentials: 'include',
    body: data ? JSON.stringify(data) : undefined
  })

 if (!res.ok) {
  const err = await res.text()
  alert(err)          // TEMP
  console.error(err)
  throw new Error(err)
}



  return res.json()
}

import type { UserPoint, LfdParts, Job, ApiResponse } from './lfdModels'

const BASEURL = 'http://localhost:5000/api/v1'

export async function getData(
  jobName: string,
  fileId: string
): Promise<[UserPoint[], LfdParts[]]> {
  const response = await fetch(`${BASEURL}/get-info`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      job: jobName,
      name: fileId,
    }),
  })
  const data = await response.json()
  const userEntry = data.points as UserPoint[]
  userEntry.sort((f, s) => f.index - s.index)
  const lfdIhkData = data.data as LfdParts[]
  return [userEntry, lfdIhkData]
}

export async function sendPointData(points: UserPoint[], fileId: string) {
  const response = await fetch(`${BASEURL}/fill`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: points,
      fileName: fileId,
    }),
  })
  const data = await response.json()

  return data['name'] as string
}

export async function getJobs() {
  const response = await fetch(`${BASEURL}/init`)
  const data = await response.json()

  return data.jobs as Job[]
}

export function dlLink(fileId: string, original_name: string) {
  return `${BASEURL}/dl/${fileId}/${original_name}`
}

export async function sendInputFile(fileData: File) {
  try {
    const fileBytes = await toBase64(fileData)
    const result = await fetch(`${BASEURL}/upload`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fileName: fileData.name,
        wordData: fileBytes,
      }),
    })
    return await result.json() as ApiResponse
  } catch (error) {
    console.log(error)
  }
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const res = reader.result as string
      if (res) {
        const data = res.replace('data', '').replace(/^.+,/, '')
        resolve(data)
      }
    }
    reader.onerror = (error) => reject(error)
  })

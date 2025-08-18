export interface CheckIn {
  id: string
  member_id: string
  checkin_time: string
  checkout_time?: string
  duration?: string
  location?: string
  activity?: string
}

export interface CheckInsResponse {
  success: boolean
  checkins?: CheckIn[]
  total?: number
  page?: number
  articles_per_page?: number
  error?: string
}

export const getCheckins = async (
  token: string,
  page: number = 1,
  articlesPerPage: number = 10
): Promise<CheckInsResponse> => {
  try {
    const formData = new FormData()
    formData.append('project', '18GYMCLUB')
    formData.append('page', page.toString())
    formData.append('articles_per_page', articlesPerPage.toString())

    const response = await fetch(
      'https://api.upfit.cloud/member-get-checkins.php?json=null',
      {
        method: 'POST',
        headers: {
          Auth: `Bearer ${token}`,
          Cookie: 'PHPSESSID=oofcbq880bklc6cpdmlkirl0k7'
        },
        body: formData
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      success: true,
      checkins: data.checkins || [],
      total: data.total || 0,
      page: data.page || page,
      articles_per_page: data.articles_per_page || articlesPerPage
    }
  } catch (error) {
    console.error('Get checkins error:', error)
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Failed to fetch check-ins'
    }
  }
}

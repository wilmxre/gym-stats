export interface CheckIn {
  id?: string
  mcid: string
  date_checkin: string
  club_name: string
  checkout_time?: string
  duration?: string
}

export interface CheckInsApiResponse {
  checkins: Record<string, CheckIn>
  pagination: {
    articles_per_page: string
    page: string
    total_entries: string
    total_pages: number
  }
}

export interface CheckInsResponse {
  success: boolean
  checkins?: CheckIn[]
  total?: number
  page?: number
  articles_per_page?: number
  total_pages?: number
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

    const data: CheckInsApiResponse = await response.json()

    const checkinsArray = Object.entries(data.checkins || {}).map(
      ([id, checkin]) => ({
        ...checkin,
        id
      })
    )

    return {
      success: true,
      checkins: checkinsArray,
      total: parseInt(data.pagination?.total_entries || '0'),
      page: parseInt(data.pagination?.page || '1'),
      articles_per_page: parseInt(data.pagination?.articles_per_page || '10'),
      total_pages: data.pagination?.total_pages || 1
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

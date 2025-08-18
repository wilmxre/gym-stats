import axios, { AxiosResponse } from 'axios'

export interface LoginParams {
  email: string
  pincode: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  member?: {
    id: string
    clubid: string
    email: string
    fname: string
    lname: string
    city: string
    country: string
    mobile_phone: string
    qr_code: string
  }
  error?: string
  rawData: string
  status: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any
}

const parseXMLResponse = (
  xmlString: string
): Omit<LoginResponse, 'rawData' | 'status' | 'headers'> => {
  try {
    const extractXmlValue = (xml: string, tagName: string): string => {
      const match = xml.match(new RegExp(`<${tagName}>(.*?)</${tagName}>`))
      return match?.[1] || ''
    }

    if (xmlString.includes('<error>')) {
      const error = extractXmlValue(xmlString, 'error')
      return {
        success: false,
        error
      }
    }

    if (xmlString.includes('<token>')) {
      const token = extractXmlValue(xmlString, 'token')

      const member = {
        id: extractXmlValue(xmlString, 'id'),
        clubid: extractXmlValue(xmlString, 'clubid'),
        email: extractXmlValue(xmlString, 'email'),
        fname: extractXmlValue(xmlString, 'fname'),
        lname: extractXmlValue(xmlString, 'lname'),
        city: extractXmlValue(xmlString, 'city'),
        country: extractXmlValue(xmlString, 'country'),
        mobile_phone: extractXmlValue(xmlString, 'mobile_phone'),
        qr_code: extractXmlValue(xmlString, 'qr_code')
      }

      return {
        success: true,
        token,
        member
      }
    }

    return {
      success: false,
      error: 'Unknown response format'
    }
  } catch (err) {
    return {
      success: false,
      error: 'Failed to parse response'
    }
  }
}

export const login = async (
  email: string,
  pincode: string
): Promise<LoginResponse> => {
  try {
    const encodedEmail = encodeURIComponent(email)
    const formData = new FormData()
    formData.append('project', '18GYMCLUB')

    const response: AxiosResponse<string> = await axios({
      method: 'POST',
      url: `https://api.upfit.cloud/authenticate.php?email=${encodedEmail}&pincode=${pincode}`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const parsedResponse = parseXMLResponse(response.data)

    return {
      ...parsedResponse,
      rawData: response.data,
      status: response.status,
      headers: response.headers
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data || error.message || 'Login failed')
    }
    throw error
  }
}

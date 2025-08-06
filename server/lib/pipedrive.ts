interface PipedriveConfig {
  api_token: string;
  url: string;
}

export class PipedriveClient {
  private config: PipedriveConfig;
  private contactSourceFieldApiKey: string;
  private newsletterOptionId: number;

  constructor(config: PipedriveConfig) {
    this.config = config;
    this.contactSourceFieldApiKey = "777843b709aa29ae549063f689f7a6bd4c06b481";
    this.newsletterOptionId = 309;
  }

  getContactSourceFieldApiKey(): string {
    return this.contactSourceFieldApiKey;
  }

  getNewsletterOptionId(): number {
    return this.newsletterOptionId;
  }

  private getParams(): URLSearchParams {
    return new URLSearchParams({ api_token: this.config.api_token });
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const params = this.getParams();
    const url = `${this.config.url}${endpoint}?${params}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(
        `Pipedrive API error: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  }

  async getPersonDetails(params: { personId: number }): Promise<any> {
    return this.makeRequest(`/v2/persons/${params.personId}`, {
      method: "GET",
    });
  }

  /**
   * Search for an existing person by email
   */
  async findPersonByEmail(params: { email: string }): Promise<number | null> {
    const searchParams = new URLSearchParams({
      term: params.email,
      fields: "email",
      exact_match: "true",
      api_token: this.config.api_token,
    });

    const result = await fetch(
      new URL(
        `${this.config.url}/v1/persons/search?${searchParams.toString()}`,
      ),
    ).then((response) => response.json());

    return result.data?.items?.[0]?.item?.id || null;
  }

  /**
   * Create a new person in Pipedrive
   */
  async createPerson(params: {
    personData: Record<string, any>;
  }): Promise<any> {
    return this.makeRequest("/v1/persons", {
      method: "POST",
      body: JSON.stringify(params.personData),
    });
  }

  /**
   * Update an existing person in Pipedrive
   */
  async updatePerson(params: {
    personId: number;
    updates: Record<string, any>;
  }): Promise<any> {
    return this.makeRequest(
      `/v1/persons/${params.personId}`,
      {
        method: "PUT",
        body: JSON.stringify(params.updates),
      },
    );
  }

  /**
   * Create a new organization in Pipedrive
   */
  async createOrganization(params: {
    name: string;
    owner_id?: number;
    [key: string]: any;
  }): Promise<any> {
    return this.makeRequest("/v1/organizations", {
      method: "POST",
      body: JSON.stringify(params),
    });
  }

  /**
   * Update an existing organization in Pipedrive
   */
  async updateOrganization(params: {
    organizationId: number;
    updates: Record<string, any>;
  }): Promise<any> {
    return this.makeRequest(`/v1/organizations/${params.organizationId}`, {
      method: "PATCH",
      body: JSON.stringify(params.updates),
    });
  }

  /**
   * Search for an existing organization by name
   */
  async findOrganizationByName(params: {
    name: string;
  }): Promise<number | null> {
    const searchParams = new URLSearchParams({
      term: params.name,
      fields: "name",
      exact_match: "true",
      api_token: this.config.api_token,
    });

    const result = await fetch(
      new URL(
        `${this.config.url}/v1/organizations/search?${searchParams.toString()}`,
      ),
    ).then((response) => response.json());

    return result.data?.items?.[0]?.item?.id || null;
  }
}

/**
 * Factory function to create a Pipedrive client instance
 */
export function createPipedriveClient(config: PipedriveConfig): PipedriveClient {
  return new PipedriveClient(config);
}

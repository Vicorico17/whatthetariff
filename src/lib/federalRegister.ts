import { Tariff } from './supabase';

const FR_API_BASE = 'https://www.federalregister.gov/api/v1';

export interface FederalRegisterDocument {
  document_number: string;
  title: string;
  publication_date: string;
  document_type: string;
  abstract: string;
  html_url: string;
  json_url: string;
  federal_register_data?: {
    citation: string;
    start_page: number;
    end_page: number;
    volume: number;
  };
}

export interface FederalRegisterSearchParams {
  conditions?: {
    term?: string;
    agencies?: string[];
    type?: string[];
    topics?: string[];
    publication_date?: {
      gte?: string;
      lte?: string;
    };
  };
  per_page?: number;
  page?: number;
  order?: 'relevance' | 'newest' | 'oldest' | 'executive_order_number';
  fields?: string[];
}

export class FederalRegisterAPI {
  private static instance: FederalRegisterAPI;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = FR_API_BASE;
  }

  public static getInstance(): FederalRegisterAPI {
    if (!FederalRegisterAPI.instance) {
      FederalRegisterAPI.instance = new FederalRegisterAPI();
    }
    return FederalRegisterAPI.instance;
  }

  private buildSearchUrl(params: FederalRegisterSearchParams): string {
    const searchParams = new URLSearchParams();
    
    if (params.conditions) {
      if (params.conditions.term) {
        searchParams.append('conditions[term]', params.conditions.term);
      }
      if (params.conditions.agencies) {
        params.conditions.agencies.forEach(agency => {
          searchParams.append('conditions[agencies][]', agency);
        });
      }
      if (params.conditions.type) {
        params.conditions.type.forEach(type => {
          searchParams.append('conditions[type][]', type);
        });
      }
      if (params.conditions.topics) {
        params.conditions.topics.forEach(topic => {
          searchParams.append('conditions[topics][]', topic);
        });
      }
      if (params.conditions.publication_date) {
        if (params.conditions.publication_date.gte) {
          searchParams.append('conditions[publication_date][gte]', params.conditions.publication_date.gte);
        }
        if (params.conditions.publication_date.lte) {
          searchParams.append('conditions[publication_date][lte]', params.conditions.publication_date.lte);
        }
      }
    }

    if (params.per_page) {
      searchParams.append('per_page', params.per_page.toString());
    }
    if (params.page) {
      searchParams.append('page', params.page.toString());
    }
    if (params.order) {
      searchParams.append('order', params.order);
    }
    if (params.fields) {
      params.fields.forEach(field => {
        searchParams.append('fields[]', field);
      });
    }

    return `${this.baseUrl}/documents?${searchParams.toString()}`;
  }

  public async searchTariffDocuments(params: FederalRegisterSearchParams = {}): Promise<FederalRegisterDocument[]> {
    try {
      // Set default search parameters for tariff-related documents
      const defaultParams: FederalRegisterSearchParams = {
        conditions: {
          term: 'tariff OR tariffs',
          type: ['NOTICE', 'RULE', 'PROPOSED_RULE'],
          agencies: ['international-trade-administration', 'international-trade-commission'],
        },
        per_page: 20,
        order: 'newest',
        ...params,
      };

      const response = await fetch(this.buildSearchUrl(defaultParams));
      
      if (!response.ok) {
        throw new Error(`Federal Register API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching Federal Register documents:', error);
      throw error;
    }
  }

  public async getDocument(documentNumber: string): Promise<FederalRegisterDocument> {
    try {
      const response = await fetch(`${this.baseUrl}/documents/${documentNumber}`);
      
      if (!response.ok) {
        throw new Error(`Federal Register API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching Federal Register document:', error);
      throw error;
    }
  }
}

export const federalRegisterAPI = FederalRegisterAPI.getInstance(); 
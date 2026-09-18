// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { PrivyAPI } from '@privy-io/node/client';

const client = new PrivyAPI({
  appID: 'My App ID',
  appSecret: 'My App Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource kyb', () => {
  // Mock server tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.organizations.kyb.list('organization_id');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('initiateLinks: only required params', async () => {
    const responsePromise = client.organizations.kyb.initiateLinks('organization_id', {
      email: 'dev@stainless.com',
      provider: 'bridge',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('initiateLinks: required and optional params', async () => {
    const response = await client.organizations.kyb.initiateLinks('organization_id', {
      email: 'dev@stainless.com',
      provider: 'bridge',
      business_name: 'x',
      client_agreement_id: 'client_agreement_id',
      endorsements: ['sepa'],
      environment: 'production',
      redirect_uri: 'https://example.com',
    });
  });

  // Mock server tests are disabled
  test.skip('initiateTos: only required params', async () => {
    const responsePromise = client.organizations.kyb.initiateTos('organization_id', {
      email: 'dev@stainless.com',
      provider: 'bridge',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('initiateTos: required and optional params', async () => {
    const response = await client.organizations.kyb.initiateTos('organization_id', {
      email: 'dev@stainless.com',
      provider: 'bridge',
      business_name: 'x',
      environment: 'production',
    });
  });

  // Mock server tests are disabled
  test.skip('submit: only required params', async () => {
    const responsePromise = client.organizations.kyb.submit('organization_id', {
      data: {},
      provider: 'bridge',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('submit: required and optional params', async () => {
    const response = await client.organizations.kyb.submit('organization_id', {
      data: {
        account_purpose: 'treasury_management',
        account_purpose_other: 'x',
        acting_as_intermediary: true,
        associated_persons: [
          {
            date_of_birth: '7321-69-10',
            email: 'dev@stainless.com',
            first_name: 'x',
            has_control: true,
            has_ownership: true,
            identifying_information: [
              {
                issuing_country: 'xxx',
                type: 'type',
                description: 'description',
                expiration: 'expiration',
                image_back: 'image_back',
                image_front: 'image_front',
                number: 'number',
              },
            ],
            is_signer: true,
            last_name: 'xx',
            residential_address: {
              city: 'x',
              country: 'xxx',
              street_line_1: 'xxxx',
              postal_code: 'x',
              street_line_2: 'x',
              subdivision: 'x',
            },
            documents: [
              {
                file: 'x',
                purposes: ['proof_of_address'],
                description: 'x',
              },
            ],
            is_director: true,
            middle_name: 'x',
            nationalities: ['xxx'],
            ownership_percentage: 0,
            phone: 'phone',
            place_of_birth: { country: 'xxx', city: 'x' },
            relationship_established_at: '7321-69-10',
            title: 'x',
            transliterated_first_name: 'x',
            transliterated_last_name: 'x',
            transliterated_middle_name: 'x',
            transliterated_residential_address: {
              city: 'x',
              country: 'xxx',
              street_line_1: 'xxxx',
              postal_code: 'x',
              street_line_2: 'x',
              subdivision: 'x',
            },
          },
        ],
        business_description: 'x',
        business_industry: ['x'],
        business_legal_name: 'x',
        business_trade_name: 'x',
        business_type: 'llc',
        compliance_screening_explanation: 'x',
        conducts_money_services: true,
        conducts_money_services_description: 'x',
        conducts_money_services_using_bridge: true,
        documents: [
          {
            file: 'x',
            purposes: ['business_formation'],
            description: 'x',
          },
        ],
        email: 'dev@stainless.com',
        estimated_annual_revenue_usd: '1000000_9999999',
        expected_monthly_payments_usd: 0,
        has_foreign_tax_registration: true,
        has_material_intermediary_ownership: true,
        high_risk_activities: ['none_of_the_above'],
        high_risk_activities_explanation: 'x',
        identifying_information: [
          {
            issuing_country: 'xxx',
            type: 'type',
            description: 'description',
            expiration: 'expiration',
            image_back: 'image_back',
            image_front: 'image_front',
            number: 'number',
          },
        ],
        incorporation_date: '7321-69-10',
        is_dao: true,
        operates_in_prohibited_countries: true,
        other_websites: ['string'],
        ownership_threshold: 5,
        phone: 'phone',
        physical_address: {
          city: 'x',
          country: 'xxx',
          street_line_1: 'xxxx',
          postal_code: 'x',
          street_line_2: 'x',
          subdivision: 'x',
        },
        primary_website: 'primary_website',
        publicly_traded_listings: [
          {
            market_identifier_code: 'xxxx',
            stock_number: 'x',
            ticker: 'x',
          },
        ],
        registered_address: {
          city: 'x',
          country: 'xxx',
          street_line_1: 'xxxx',
          postal_code: 'x',
          street_line_2: 'x',
          subdivision: 'x',
        },
        regulated_activity: {
          license_number: 'x',
          primary_regulatory_authority_country: 'xxx',
          primary_regulatory_authority_name: 'x',
          regulated_activities_description: 'x',
        },
        source_of_funds: 'sales_of_goods_and_services',
        source_of_funds_description: 'x',
        transliterated_business_legal_name: 'x',
        transliterated_business_trade_name: 'x',
        transliterated_physical_address: {
          city: 'x',
          country: 'xxx',
          street_line_1: 'xxxx',
          postal_code: 'x',
          street_line_2: 'x',
          subdivision: 'x',
        },
        transliterated_registered_address: {
          city: 'x',
          country: 'xxx',
          street_line_1: 'xxxx',
          postal_code: 'x',
          street_line_2: 'x',
          subdivision: 'x',
        },
      },
      provider: 'bridge',
      client_agreement_id: 'client_agreement_id',
      endorsements: ['sepa'],
      environment: 'production',
    });
  });
});

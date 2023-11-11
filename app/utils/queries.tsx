import { gql } from 'urql';

{/* User Queries */}
const FETCH_USERS = gql`
  query Users($search: String){
    users(
        filter: {
            or: [
                {firstName: {icontains: $search}}
                {lastName: {icontains: $search}}
                {email: {icontains: $search}}
                {phoneNumber: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
            id,
            firstName,
            lastName,
            email,
            phoneNumber,
            title,
            createdBy{
              firstName,
              lastName
            }
        }
      }
    }
  }
`;

const VERIFY_EMAIL_TOKEN = gql`
  query VerifyEmailToken($token: String, $type: String!) {
    verifyEmailToken(token: $token, type: $type) {
        isReturning,
        rawToken,
        email,
        firstName,
        lastName,
        email,
        phoneNumber,
        permissions,
        landlord
    }
  }
`;

const USER_BY_ID = gql`
  query UserById($id: String) {
    userById(id: $id) {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      title,
      permissions,
      profilePicture,
    }
  }
`;

const DELETE_USER = gql`
  query DeleteUsers($ids: [String!]) {
    deleteUsers(ids: $ids) {
      ids,
    }
  }
`;
{/* End of User Queries */}


{/* Property Queries */}
const FETCH_PROPERTIES = gql`
  query Properties($search: String){
    properties(
        filter: {
            or: [
                {name: {icontains: $search}}
                {description: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
            id,
            name,
            description,
            location{
              state 
              lga
            },
            tenants,
            units,
            user{
              firstName,
              lastName
            }
        }
        }
    }
  }
`;

const PROPERTY_BY_ID = gql`
  query PropertyById($id: String) {
    propertyById(id: $id) {
      id,
      name,
      description,
      location{
        state 
        lga
      },
      tenants,
      units,
      user{
        firstName,
        lastName
      },
      createdAt
    }
  }
`;

const DELETE_PROPERTY = gql`
  query DeleteProperties($ids: [String!]) {
    deleteProperties(ids: $ids) {
      ids,
    }
  }
`;

{/* End of Property Queries */}

{/* Unit Queries */}
const FETCH_UNITS = gql`
  query Units($search: String, $id: String){
    units(
        id: $id,
        filter: {
            or: [
                {name: {icontains: $search}}
                {description: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
            id,
            name,
            quantity,
            currency,
            price,
            tenants,
            published,
            property{
              id
            },
            user{
              firstName,
              lastName
            }
        }
        }
    }
  }
`;

const UNIT_BY_ID = gql`
  query unitById($id: String) {
    unitById(id: $id) {
      id,
      name,
      quantity,
      price,
      currency,
      paymentPlan,
      published,
      contactUsers{
        firstName,
        lastName,
        phoneNumber
      },
      location{
        state 
        lga
      },
      description,
      propertyUnitFeatures{
        bathrooms,
        bedrooms,
        toilets,
        parkingSpace,
        floorNumber
      }
      type,
      furnishing,
      category, 
      images,
      user{
        firstName,
        lastName
      },
      createdAt
    }
  }
`;

const SET_PUBLISHED = gql`
  query SetPublished($id: String, $published: Boolean) {
    setPublished(id: $id, published: $published) {
      id,
      published
    }
}
`;

const DELETE_UNIT = gql`
  query DeleteUnits($ids: [String!]) {
    deleteUnits(ids: $ids) {
      ids,
    }
  }
`;

{/* End of Unit Queries */}

{/* Tenant Queries */}
const FETCH_TENANTS = gql`
  query Tenants($search: String){
    tenants(
        filter: {
            or: [
                {firstName: {icontains: $search}}
                {lastName: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
            id,
            firstName,
            lastName,
            property,
            unit,
            createdBy{
              firstName,
              lastName
            }
        }
        }
    }
  }
`;

const TENANT_BY_ID = gql`
  query TenantById($id: String) {
    tenantById(id: $id) {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      property,
      unit, 
      moreInfo,
      tenantHasRecorded,
      files{
        id,
        title,
        image
      },
      landlord,
      createdBy{ 
        firstName,
        lastName
      },
      createdAt
    }
  }
`;

const DELETE_TENANT = gql`
  query DeleteTenants($ids: [String!]) {
    deleteTenants(ids: $ids) {
      ids,
    }
  }
`;

{/* End of Tenant Queries */}

{/* Transaction Queries */}
const FETCH_TRANSACTIONS = gql`
  query Transactions($search: String, $transaction_type: String){
    transactions(
        transactionType: $transaction_type,
        filter: {
            or: [
                {title: {icontains: $search}}
                {description: {icontains: $search}}
            ]
        }
        ){
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
        }
        edges {
        cursor
        node {
            id,
            title,
            description,
            amount,
            currency,
            property {
              name
            },
            user{
              firstName,
              lastName
            }
        }
        }
    }
  }
`;

const TRANSACTION_BY_ID = gql`
  query TransactionById($id: String) {
    transactionById(id: $id) {
      id,
      title,
      description,
      amount,
      currency,
      type,
      paymentMethod,
      property {
        name
      },
      createdAt
      transactionDate,
      user{
        firstName,
        lastName
      }
    }
}
`;

const DELETE_TRANSACTION = gql`
  query DeleteTransactions($ids: [String!]) {
    deleteTransactions(ids: $ids) {
      ids,
    }
  }
`;
{/* End of Transaction Queries */}

{/* Summary Queries */}
const FETCH_SUMMARY = gql`
  query Summary($currency: String!){
    summary(currency: $currency) {
      income,
      expense,
      balance,
      occupiedUnits,
      vacantUnits,
      totalUnits,
      units,
      properties
    }
  }
`;
{/* End of Summary Queries */}


export {
    VERIFY_EMAIL_TOKEN,
    FETCH_USERS,
    DELETE_USER,
    USER_BY_ID,
    FETCH_PROPERTIES,
    PROPERTY_BY_ID,
    DELETE_PROPERTY,
    FETCH_UNITS,
    UNIT_BY_ID,
    SET_PUBLISHED,
    DELETE_UNIT,
    FETCH_TENANTS,
    TENANT_BY_ID,
    DELETE_TENANT,
    FETCH_TRANSACTIONS, 
    TRANSACTION_BY_ID,
    DELETE_TRANSACTION,
    FETCH_SUMMARY
}
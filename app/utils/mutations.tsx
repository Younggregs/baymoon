import { gql } from 'urql';

{/* User Queries */}
const SIGNUP = gql`
    mutation Signup($first_name: String!, $last_name: String!, $phone_number: String, $email: String!, $password: String!) {
        signup(firstName: $first_name, lastName: $last_name, phoneNumber: $phone_number, email: $email, password: $password) {
            success,
            errors{
                message
            },
            user {
                id
            }
        }
    }
`;

const LOGIN = gql`
    mutation TokenAuth($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
            payload
            refreshExpiresIn
        }
    }
`;

const VERIFY_TOKEN = gql`
    mutation VerifyToken($token: String!) {
        verifyToken(token: $token) {
            payload
        }
}
`;

const VERIFY_EMAIL = gql`
    mutation EmailVerification($email: String!, $type: String!) {
    emailVerification(email: $email, type: $type) {
        emailToken{
            email
        }
    }
    }
`;

const CREATE_USER = gql`
     mutation CreateUser($first_name: String!, $email: String!, $last_name: String!, $phone_number: String,  $title: String,  $permissions: [String!]) {
  createUser(firstName: $first_name, email: $email, lastName: $last_name, phoneNumber: $phone_number, title: $title, permissions: $permissions) {
    user {
        id
    }
  }
 }
`;

const UPDATE_USER = gql`
    mutation UpdateUser($id: String, $first_name: String, $last_name: String, $phone_number: String, $file: Upload, $title: String, $permissions: [String]) {
  updateUser(id: $id, firstName: $first_name, lastName: $last_name, phoneNumber: $phone_number, file: $file, title: $title, permissions: $permissions) {
    user {
        id,
        firstName,
        lastName,
        phoneNumber,
        profilePicture,
        title,
    },
    success,
    errors {
        message
    }
  }
 }
`;

{/* End of user queries */}

{/* Property Queries */}
const CREATE_PROPERTY = gql`
     mutation CreateProperty($name: String!, $state: String!, $lga: String!, $description: String) {
    createProperty(name: $name, state: $state, lga: $lga, description: $description) {
        property {
            id,
        },
        success,
        errors{
            message
        },
    }
    }
`;
{/* End of Property Queries */}

{/* Property Unit Queries */}
const CREATE_UNIT = gql`
     mutation CreatePropertyUnit($property_id: String!,$name: String!, $category: String!, $type: String, $furnishing: String, $description: String!, $price: Int!, $currency: String!, $contacts: [String!],
     $payment_plan: String, $quantity: Int!, $bathrooms: Int, $bedrooms: Int, $toilets: Int, $parking_space: Int, $floor_number: Int, $published: Boolean, $images: [Upload]) {
  createPropertyUnit(propertyId: $property_id, name: $name, category: $category, type: $type, furnishing: $furnishing, description: $description, price: $price, currency: $currency, contacts: $contacts, paymentPlan: $payment_plan, quantity: $quantity, bathrooms: $bathrooms, bedrooms: $bedrooms, toilets: $toilets, parkingSpace: $parking_space, floorNumber: $floor_number, published: $published, images: $images) {
    propertyUnit {
        id,
    },
    success,
    errors {
        message
    }
  }
 }
`;
{/* End of Property Unit Queries */}

{/* Tenants Queries */}
const CREATE_TENANT = gql`
     mutation CreateTenant($property_id: String!, $unit_id: String!, $first_name: String!, $last_name: String!, $email: String!, $phone_number: String, $more_info: JSONString, $files: [String]) {
  createTenant(propertyId: $property_id, unitId: $unit_id, firstName: $first_name, lastName: $last_name, email: $email, phoneNumber: $phone_number, moreInfo: $more_info, files: $files) {
    tenant {
        id,
    },
    success,
    errors {
        message
    }
  }
 }
`;

const UPDATE_TENANT = gql`
     mutation updateTenant($id: String!, $first_name: String!, $last_name: String!, $email: String!, $phone_number: String, $more_info: JSONString) {
  updateTenant(id: $id, firstName: $first_name, lastName: $last_name, email: $email, phoneNumber: $phone_number, moreInfo: $more_info) {
    tenant {
        id,
    },
    success,
    errors {
        message
    }
  }
 }
`;

const UPDATE_TENANT_FILE = gql`
     mutation updateTenantFile($id: String!, $file: Upload!) {
  updateTenantFile(id: $id, file: $file) {
    tenantFile {
        id,
    },
    success,
    errors {
        message
    }
  }
 }
`;
{/* End of Tenants Queries */}

{/* Transactions Queries */}
const CREATE_TRANSACTION = gql`
      mutation CreateTransaction($property_id: String!, $unit_id: String!, $title: String!, $amount: Int!, $currency: String!, $type: String!, $description: String!, $payment_method: String) {
  createTransaction(propertyId: $property_id, unitId: $unit_id, title: $title, amount: $amount, currency: $currency, type: $type, description: $description, paymentMethod: $payment_method) {
    transaction {
        id,
    },
    errors {
        message
    }
  }
 }
`;

export { 
    SIGNUP, 
    LOGIN, 
    VERIFY_TOKEN,
    VERIFY_EMAIL,
    CREATE_USER,
    UPDATE_USER,
    CREATE_PROPERTY,
    CREATE_UNIT,
    CREATE_TENANT,
    CREATE_TRANSACTION,
    UPDATE_TENANT,
    UPDATE_TENANT_FILE
};
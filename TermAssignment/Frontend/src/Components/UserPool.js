import { CognitoUserPool } from  "amazon-cognito-identity-js";

const poolData = { 
    UserPoolId: "us-east-1_r2iCeNTyz",
    ClientId: "5isnu0og7cf71qj5cis6qudtsv"
}

export default new CognitoUserPool(poolData);
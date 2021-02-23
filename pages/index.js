import { useMsal } from "@azure/msal-react";

const createUser = async (accounts) => {
    const claims = accounts[0].idTokenClaims;

    const user = {
        emailAddress: claims.email,
        firstName: claims.given_name,
        lastName: claims.family_name,                
        uniqueExternalId: accounts[0].localAccountId
    }
    
    await fetch(`http://localhost/favolog.service/api/user`, {
        method: "POST",
        headers: {            
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

export default function Home() {      
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;

    if (isAuthenticated){
        createUser(accounts)
    }    

    return (
        <>
            {isAuthenticated ? <h2> Catalogs that user is following</h2>  : <h2>Public catalogs </h2>  }            
        </>
    );
}


import { useMsal } from "@azure/msal-react";

export default function Home() {      
    const { accounts } = useMsal();
    const isAuthenticated = accounts.length > 0;

    if (accounts.length > 0){
        const user = accounts[0].name;
    }
    console.log("accounts", accounts);    

    return (
        <>
            {isAuthenticated ? <h2> Welcome  {accounts[0].name}</h2>  : <h2>Please sign-in </h2>  }            
        </>
    );
}


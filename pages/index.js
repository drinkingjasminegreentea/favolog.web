import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

export default function Page() {      
    return (
        <>            
            <AuthenticatedTemplate>
                <p>At least one account is signed in!</p>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <p>No users are signed in!</p>
            </UnauthenticatedTemplate>          
        </>
    );
}


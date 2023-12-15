export const bcFetch: 
    <VarType>(query: string, vars: VarType) => Promise<{data: any}>
    = async (query, vars) => {
    
    const gqlUrl = process.env.REACT_APP_GQL_URL;
    const gqlToken = process.env.REACT_APP_GQL_TOKEN;

    return fetch(gqlUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${gqlToken}`
        },
        body: JSON.stringify({
            query: query,
            variables: vars
        }),
        credentials: 'include',
    }).then(resp => resp.json())
}
export const bcFetch: 
    <VarType>(query: string, vars: VarType) => Promise<{data: any}>
    = async (query, vars) => {
    
    const storeHash = process.env.REACT_APP_STORE_HASH;
    const channelId = process.env.REACT_APP_CHANNEL;
    const gqlToken = process.env.REACT_APP_GQL_TOKEN;

    return fetch(`https://store-${storeHash}-${channelId}.mybigcommerce.com/graphql`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${gqlToken}`
        },
        body: JSON.stringify({
            query: query,
            variables: vars
        })
    }).then(resp => resp.json())
}
import { createContext, useState, useContext, useEffect } from "react";
import { bcFetch } from "../utils/bigcommerceGql";

export type Customer = {
    entityId?: string,
    firstName?: string,
    lastName?: string,
}

export const emptyCustomer = {
    entityId: null,
    firstName: null,
    lastName: null,
}

const getCustomerQuery = `
query GetCustomer {
    customer {
        entityId
        firstName
        lastName
    }
}
`

const CustomerContext = createContext<{customer: Customer, setCustomer: (customer: Customer) => void}>({customer: emptyCustomer, setCustomer: (customer) => {}});

export const CustomerProvider = ({children}) => {
    const [customer, setCustomer] = useState<Customer>(emptyCustomer);

    useEffect(() => {
        bcFetch<{}>(getCustomerQuery, {}).then(result => {
            const customerResult = result.data?.customer;

            if (customerResult) {
                setCustomer(customerResult);
            }
        });
    }, []);

    return (
        <CustomerContext.Provider value={{customer, setCustomer}}>
            {children}
        </CustomerContext.Provider>
    )
}

export const useCustomer = () => useContext(CustomerContext);

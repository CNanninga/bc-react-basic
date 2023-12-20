import { useState } from "react";
import { bcFetch } from "../utils/bigcommerceGql";
import { useCustomer } from "../context/customerContext";

const loginMutation = `
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        customer {
            entityId
            firstName
            lastName
        }
    }
}
`

export default function Login(
    { setPage }: {setPage: (type: string, id?: string) => void}
) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setCustomer } = useCustomer();

    const onSubmit: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();
        
        const result = await bcFetch<{email: String, password: String}>(loginMutation, {
            email,
            password,
        });
        
        const customerResult = result.data?.login?.customer;
        if (customerResult) {
            setCustomer(customerResult);
            setPage('products');
        }
    }

    return (
        <div>
            <h1 className="text-2xl my-8">Login</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Email</label>:
                    <input className="border border-black p-2" type="text" name="email" id="email"
                        value={email} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setEmail(e.target.value)}} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>:
                    <input className="border border-black p-2" type="password" name="password" id="password"
                        value={password} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setPassword(e.target.value)}} 
                    />
                </div>
                <div className="my-8">
                    <button className="border border-black p-2">Submit</button>
                </div>
            </form>
        </div>
    )
}
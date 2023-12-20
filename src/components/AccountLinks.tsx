import { useCustomer, emptyCustomer } from "../context/customerContext";
import { bcFetch } from "../utils/bigcommerceGql";

const logoutMutation = `
mutation Logout {
    logout {
        result
    }
}
`

export default function AccountLinks(
    { setPage }: { setPage: (type: string, id?: string) => void }
) {
    const { customer, setCustomer } = useCustomer();

    const loginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setPage('login');
    }

    const logoutClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        await bcFetch<{}>(logoutMutation, {});
        setCustomer(emptyCustomer);
    }

    if (customer.entityId) {
        return (
            <div>
                <a className="cursor-pointer" onClick={logoutClick}>Logout</a>
            </div>
        )
    }

    return (
        <div>
            <a className="cursor-pointer" onClick={loginClick}>Login</a>
        </div>
    )
}
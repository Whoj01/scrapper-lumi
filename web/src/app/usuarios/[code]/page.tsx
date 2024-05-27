import UserPage from "@/components/UserPage/UserPage";
import { LoadingUsers } from "@/components/ui/loadingUsers";
import { Suspense } from "react";

export default function UsersPage({ params }: { params: {code: string }}) {
    return (
     <Suspense fallback={<LoadingUsers />}>
        <UserPage code={params.code} />
      </Suspense>
    )
}
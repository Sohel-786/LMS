import HomeLayout from "../layouts/HomeLayout";

function Loading(){
    return(
        <HomeLayout>
            <div className="w-full min-h-[90vh] flex justify-center items-center">
                <div className="w-fit animate-spin">
                    <img className="w-[50px] aspect-auto" src="/assets/loading.png" alt="Loading" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default Loading;
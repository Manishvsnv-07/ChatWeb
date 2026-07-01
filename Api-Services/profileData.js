const getdata = async () => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL)
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/data`, {
            method: "GET",
            credentials: "include"
        });

        const data = await res.json();
        return data;

    } catch (error) {
        console.log("Error:", error);
    }
};

export {getdata}

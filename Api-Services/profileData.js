const getdata = async () => {
    try {
        const res = await fetch("http://localhost:8080/profile/data", {
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
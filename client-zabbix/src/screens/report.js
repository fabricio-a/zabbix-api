export default function Report() {
    const getHistory = async (time_from, time_till, graphs) => {
        const url = 'http://172.16.10.65:4444/generate-report/history?time_from='+time_from+'&time_till='+time_till+'&graphids='+graphs

        const response = await fetch(url)
            .then(res => res.json())
            .then(history => history)
        
        return response
    }

    return {
        getHistory
    }
}
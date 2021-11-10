export default function Report() {
    const getHistory = async (hostids, time_from, time_till) => {
        const url = 'http://172.16.10.65:4444/generate-report/history?hostids=['+hostids.toString()+']&time_from='+time_from+'&time_till='+time_till
        console.log(url)
        const response = await fetch(url)
            .then(res => res.json())
            .then(history => console.log(history))
        
        return response
    }

    return {
        getHistory
    }
}
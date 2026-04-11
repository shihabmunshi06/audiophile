const useTimestamp = (timestamp) => {
    const date = new Date(timestamp).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })

    const time = new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    })

    return { date, time }
}

export default useTimestamp
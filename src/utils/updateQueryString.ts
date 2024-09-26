function updateQueryString(
    params: Record<string, string> | string | URLSearchParams
) {
    const queryString = new URLSearchParams(
        Object.fromEntries(
            Object.entries(params).filter(
                ([, value]) => typeof value !== 'undefined'
            )
        )
    ).toString()
    const newUrl = `${window.location.pathname}?${queryString}`

    window.history.pushState(null, '', newUrl)
}

export default updateQueryString

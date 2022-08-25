interface Position {
    coords: { 
        latitude: number | string,
        longitude: number,
    },
    postcode: number,
    state: string
}

export default Position

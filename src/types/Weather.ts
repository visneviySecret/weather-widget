interface Weather {
    id: number;
        weather:  Array<{
            dew_point: number|null,
            description: string,
            icon: string,
            main: string,
        }>,
        main: {
            temp: number,
            feels_like: number,
            pressure: number,
            humidity: number,
        },
        name: string
        country: string,
        sys: {country: string},
        wind: {speed: number},
        visibility: number,

}

export default Weather
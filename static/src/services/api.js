export const BASE_URL = 'http://10.23.23.123:8000'

export const getProfilesRequest = async () => {
    return await fetch(`${BASE_URL}/dd104`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: 'get_profiles'
        })
    })
}

// mock - request

const responceMock = {
    active: {
        name: "Profile 1",
        proc_data: [
            {
                main: "10.30.44.15:23678",
                second: null,
                comment: "Если вы думаете, что однажды написанная программа будет работать навсегда, значит, вы не понимаете, как работает программирование. Они сломаются, даже если вы не трогаете их",
                status: 0
            },
            {
                main: "10.30.44.15:23678",
                second: null,
                comment: "Если вы ошиблись в предсказании скорости разработки, просто увеличьте количество программистов на проекте. Таким образом, вы удвоите время, затраченное на разработку",
                status: 1
            },
            {
                main: "10.30.44.15:23678",
                second: "10.30.44.15:23678",
                comment: "Всегда мало времени, чтобы разработать проект, но его всегда хватает, чтобы сделать в 2 раза больше багов",
                status: 2
            },
            {
                main: "10.30.44.15:23678",
                second: "10.30.44.15:23678",
                comment: "Хотел задать вопрос – It это ориентация или все же диагноз?",
                status: -1
            },
            {
                main: "10.30.44.15:23678",
                second: "10.30.44.15:23678",
                comment: "Код писать надо так , словно человек, который будет его поддерживать  — психопат, который знает, где ты живешь",
                status: 0
            },
            {
                main: "10.30.44.15:23678",
                second: "10.30.44.15:23678",
                comment: "Баг — это еще не записанная  фича",
                status: -1
            }
        ]
    },
    // ? profiles_names
    loadout_names: [
        "Profile 1",
        "Profile 2",
        "Profile 3"
    ]
}

export const getProfilesMock = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(responceMock);
            // reject();
        }, 1500)
    })
}
const dashboardTableSheme = [
    {
        title: 'Индекс',
        dataIndex: 'id',
        key: 'id',
        render: (text) => (
            <div className='text_type_main_default text_color_blue'>
                {text + 1}.
            </div>
        )
    },
    {
        title: 'IP',
        dataIndex: 'ip',
        key: 'ip',
        render: (text) => {
            if (text) {
                return <div className='text_type_main_default'>{text}</div>
            } else {
                return <div className='text_type_main_default text_color_inactive'>—</div>
            }

        }
    },
    {
        title: 'MAC',
        dataIndex: 'mac',
        key: 'mac',
        render: (text) => (
            <div className='text_type_main_default'>{text}</div>
        )
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            switch (text.toLowerCase()) {
                case 'up': {
                    return <div className='text_type_main_default text_color_green'>Up, configured</div>
                }
                case 'down': {
                    return <div className='text_type_main_default'>Down</div>
                }
                case 'unknown': {
                    return <div className='text_type_main_default text_color_inactive'>Unknown</div>
                }
                default: {
                    return <></>
                }
            }
        }
    }
]

export default dashboardTableSheme;
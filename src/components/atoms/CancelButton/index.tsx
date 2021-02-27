import { Button } from '@material-ui/core'
import React from 'react'

interface CancelButtonProps {
    to: string
}

// export default function CancelButton (props: CancelButtonProps) {
//     return (
//         <Button variant="contained">
//             キャンセル
//         </Button>
//     )
// }

export default function CancelButton ({
    to,
}: CancelButtonProps) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        window.open(to, '_blank')
    }

    return (
        <div onClick={handleClick}>
            <Button>
                キャンセル
            </Button>
        </div>
    )
}
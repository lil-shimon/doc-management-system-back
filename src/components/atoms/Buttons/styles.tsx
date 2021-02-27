import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) =>
    createStyles({
        icon: {
            marginRight: '.2rem'
        },
        circlureIcon: {
            marginRight: '.5rem',
            marginLeft: '.3rem'
        }
    })
)

export default useStyles

export const useBackButtonStyles = makeStyles((theme) => 
    createStyles({
        withIconButton: {
            padding: '6px 8px'
        }
    })
)

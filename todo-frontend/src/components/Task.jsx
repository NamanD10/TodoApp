import useState from 'react'
import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import cardContentClasses from '@mui/material'


export default function Task({title , description}) {
    return(
        <Card variant='outlined'>
            <CardHeader>
                <Typography variant='h5'>{title}</Typography>
            </CardHeader>
            <CardContent>
                <Typography variant='body1'>{description}</Typography>
            </CardContent>
            <CardActionArea>
                <CardActions><Button variant='outlined' size='small'>Done</Button></CardActions>
            </CardActionArea>
        </Card>

    )

}

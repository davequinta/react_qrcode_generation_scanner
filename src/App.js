import React, {useState, useEffect} from 'react';
import {Container, Card, CardContent, makeStyles, Grid, TextField, Button,Table} from '@material-ui/core';
import QrReader from 'react-qr-reader';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import db from './Firestore'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function App() { 
  const MySwal = withReactContent(Swal)
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [users,setUsers]=useState([])

  const classes = useStyles();



    const fetchUsers=async()=>{
      setUsers([])
      const response=db.collection('users');
      const data=await response.get();
      data.docs.forEach(item=>{
        setUsers(users => users.concat(item.data()))
      })

      console.log(users)
  }

    

    useEffect(() => {
      fetchUsers();
    }, [])

    const handleErrorWebCam = (error) => {
      console.log(error);
    }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
        var docRef = db.collection("users").doc(result);
        docRef.get().then((doc) => {
          if (doc.exists) {
              console.log("Document data:", doc.data());
              db.collection('users').doc(result).update({status:"X"})
              Swal.fire({
                title: 'Bienvenido: '+ doc.data().name,
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
              }).then((result) => {
                if (result.isConfirmed) {
                  fetchUsers();
                  setScanResultWebCam("");
                }
              })
          } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
          }
      }).catch((error) => {
          console.log("Error getting document:", error);
      });

    }
   }
  return (
    <Container className={classes.conatiner}>
     
          <Card>
              <h2 className={classes.title}>Asistencia Wacharlust</h2>
              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Code: {scanResultWebCam}</h3>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>
          <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Code</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Asistencia</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.code}>
              <TableCell component="th" scope="row">
                {user.code}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right">{user.status}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
}));
export default App;

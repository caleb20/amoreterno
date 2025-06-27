function Error({ statusCode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ fontSize: 48, marginBottom: 16 }}>¡Ups! Algo salió mal.</h1>
      {statusCode
        ? <p>El servidor respondió con el código {statusCode}.</p>
        : <p>Ocurrió un error en el cliente.</p>
      }
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error; 
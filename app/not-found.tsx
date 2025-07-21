import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#cbd5e1',
      backgroundColor: '#0f172a'
    }}>
      <h1 style={{
        display: 'inline-block',
        borderRight: '1px solid rgba(203, 213, 225, 0.3)',
        margin: '0',
        marginRight: '20px',
        padding: '10px 23px 10px 0',
        fontSize: '24px',
        fontWeight: '500',
        verticalAlign: 'top'
      }}>
        404
      </h1>
      <div style={{
        display: 'inline-block',
        textAlign: 'left',
        lineHeight: '49px',
        height: '49px',
        verticalAlign: 'middle'
      }}>
        <h2 style={{
          fontSize: '14px',
          fontWeight: 'normal',
          lineHeight: 'inherit',
          margin: '0',
          padding: '0'
        }}>
          This page could not be found.
        </h2>
      </div>
      <Link href="/" style={{
          marginTop: '2rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#334155',
          color: '#f1f5f9',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
      }}>
        Return Home
      </Link>
    </div>
  );
}

import styles from './styles.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      &copy; {new Date().getFullYear()} Jinx Capital
    </footer>
  );
};

export default Footer;

import imgLogo from '@assets/logo.png';

const Header = () => {
  return (
    <>
      <div className="logo-panel">
        <img className="logo" src={imgLogo} />
        <span className="name">Hapydev</span>
      </div>
      <div className="brand-desc">更懂中国程序员的研发效率工具</div>
    </>
  );
};
export default Header;

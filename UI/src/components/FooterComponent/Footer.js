import './Footer.css';

function Footer() {
  return (
    <footer className="section footer">
      <div className="copyrights">
        <div className="container">
          <div className="clearfix">
            <div className="pull-left">
              <div className="cop-logo">
                <a style={{ display: 'flex' }}>
                  <img src="./assets/images/favicon.ico" alt="" />
                  <h4
                    className="cop-logo"
                    style={{
                      color: '#fff',
                      marginTop: '10px',
                      fontStyle: 'italic',
                    }}
                  >
                    Faculty Forum
                  </h4>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
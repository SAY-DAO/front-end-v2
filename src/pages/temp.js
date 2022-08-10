/* eslint-disable */
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { withStyles } from '@mui/styles';
import { Trans } from 'react-i18next';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { enDate, faDate } from '../../date.js';
import { api } from '../../api';

// For multi-language
import multilang from '../../multilang.js';

import Protected from '../protected.js';

import BackIcon from '../../resources/img/back_g.svg';

const styles = {
  root2: {
    display: 'flex',
    '& > *': {
      width: '80px !important',
      height: '80px !important',
      color: '#f59e39',
      position: 'absolute',
      top: '50%',
      left: '50%',
      right: '10%',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      animation: 'none',
    },
  },
};

class Report extends React.Component {
  constructor(props) {
    super(props);

    const { type } = this.props.location.state.needData;
    const { name } = this.props.location.state.needData;
    const cleanTitle = this.props.location.state.needData.clean_title;
    const { link } = this.props.location.state.needData;

    this.state = {
      childId: this.props.location.state.childId,
      needId: this.props.match.params.needId,
      loading: false,
      modalIsOpen: true,

      status: this.props.location.state.status,
      needId: this.props.location.state.needData.id,
      type,
      needName: type && link ? cleanTitle : name,
      needCost: this.props.location.state.needData.cost,
      childSayName: this.props.location.state.needData.childSayName,
      dkc: this.props.location.state.needData.dkc,

      date2p2s: this.props.location.state.needData.doneAt,
      date3p: this.props.location.state.needData.purchase_date,
      date4p3s: this.props.location.state.needData.ngo_delivery_date,
      date5p4s: this.props.location.state.needData.child_delivery_date,

      socialWorkerGeneratedCode: '',
      receipts: [],
    };
  }

  getChild = () =>
    api.request({
      url: `/child/childId=${this.state.childId}&confirm=1`,
      method: 'GET',
    });

  getReceipts = () =>
    api.request({
      url: `/needs/${this.state.needId}/receipts`,
      method: 'GET',
    });

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    this.getChild().then((res) => {
      const result = res.data;
      this.setState({
        loading: true,
        socialWorkerGeneratedCode: result.socialWorkerGeneratedCode,
      });
    });

    this.getReceipts().then((res) => {
      this.setState({
        receipts: res.data,
      });
    });
  }

  formatDate = (date, lang) => {
    if (lang == 'en') {
      return enDate(date);
    }
    if (lang == 'fa') {
      return faDate(date);
    }
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      height: `${window.innerHeight}px`,
    });
  };

  openModal = () => {
    this.setState({
      modalIsOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  goBack = () => {
    window.history.back();
  };

  // pdfMaker() {
  //   var element = document.body;
  //   var imgData = null;
  //   html2canvas(element)
  //   .then(function(canvas) {
  //     imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();
  //     pdf.fromHTML('<div style="color: red"><h1>Hello</h1><hr/><p>This is a test.</p></div>', 0, 0);
  //     pdf.output('dataurlnewwindow');
  //     // pdf.save("download.pdf");
  //   });
  //   this.setState({
  //     img: imgData
  //   });
  // }

  reportTemplate = (
    image,
    title,
    paragraph,
    swId,
    socialWorkerCode,
    showDkc,
    dkcNumber
  ) => (
    <div className="report-body">
      <div className="headerPage report flex-row al-center">
        <img className="back" alt="back" src={BackIcon} onClick={this.goBack} />
      </div>
      <div className="report-container">
        <div className="report-content">
          <img src={image} />
          <div>
            <p className="report-title">{title}</p>

            <p className="report-paragraph">
              {paragraph}
              <span className={swId ? 'report-details' : 'hidden'}>
                {socialWorkerCode}
              </span>
              <span className={showDkc ? 'report-details' : 'hidden'}>
                {dkcNumber}
              </span>
            </p>

            <p className="report-contact">{multilang.t('report.contact')}</p>
          </div>

          <div className="report-logo-wrapper">
            <a href="http://say.company" target="_blank" rel="noreferrer">
              <img
                className="report-logo"
                src="https://sayapp.company/public/resources/img/logo-white.png"
              />
            </a>
          </div>
        </div>

        <div id="socials" className="report-social-wrapper">
          <a
            href="https://linkedin.com/company/say-company/"
            className="report-social"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://sayapp.company/public/resources/img/linkdin1.png" />
          </a>

          <a
            href="https://instagram.com/say.company/"
            className="report-social"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://sayapp.company/public/resources/img/instagram1.png" />
          </a>

          <a
            href="https://twitter.com/say_company"
            className="report-social"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://sayapp.company/public/resources/img/twitter1.png" />
          </a>

          <a
            href="https://facebook.com/say.company/"
            className="report-social"
            target="_blank"
            rel="noreferrer"
          >
            <img src="https://sayapp.company/public/resources/img/facebook1.png" />
          </a>
        </div>

        <div id="address" className="report-address">
          {/* <p>{multilang.t("report.address")}</p> */}
          <p>
            <Trans i18nKey="report.phoneNumber">
              Tel:{' '}
              <span dir="ltr" className="ltr">
                0 2 1 - 2 2 3 4 7 8 1 4
              </span>
            </Trans>
          </p>
        </div>
      </div>
    </div>
  );

  renderReport = () => {
    const {
      status,
      type,
      socialWorkerGeneratedCode,
      needName,
      needCost,
      childSayName,
      date2p2s,
      date3p,
      date4p3s,
      date5p4s,
      dkc,
    } = this.state;

    const prettyCost = needCost.toLocaleString();

    let image = '';
    let paragraph = '';
    let title = '';
    let socialWorkerCode = '';
    let swId = false;
    let showDkc = false;
    let dkcNumber = '';

    socialWorkerCode = (
      <Trans i18nKey="report.swId">
        The social worker ID: {{ socialWorkerGeneratedCode }}
      </Trans>
    );
    dkcNumber = <Trans i18nKey="report.dkc">DKC number: {{ dkc }}</Trans>;
    switch (status) {
      case 2: // done (p2s2)
        image = multilang.t('report.p2s2.img');
        title = (
          <Trans i18nKey="report.p2s2.title">
            One of {{ childSayName }}’s needs is completely done
          </Trans>
        );
        paragraph = (
          <Trans i18nKey="report.p2s2.paragraph">
            With your collaborations, all expenses for {{ needName }} has been
            paid for on
            {{
              date: this.formatDate(date2p2s, multilang.t('assets.language')),
            }}
            .{{ childSayName }}
          </Trans>
        );
        break;

      case 3: // purchased, money
        switch (type) {
          case 0: // service (s3)
            swId = true;
            image = multilang.t('report.s3.img');
            title = multilang.t('report.s3.title');
            paragraph = (
              <Trans i18nKey="report.s3.paragraph">
                The amount of {{ needCost: prettyCost }} Tomans for purchasing{' '}
                {{ childSayName }}’s {{ needName }}, has been transferred into
                the NGO’s bank account, on
                {{
                  date: this.formatDate(
                    date4p3s,
                    multilang.t('assets.language')
                  ),
                }}
                .
              </Trans>
            );
            break;

          case 1: // product (p3)
            showDkc = Boolean(dkc || false);
            image = multilang.t('report.p3.img');
            title = (
              <Trans i18nKey="report.p3.title">
                Purchase receipt for {{ childSayName }}’s needs
              </Trans>
            );
            paragraph = (
              <Trans i18nKey="report.p3.paragraph">
                {{ needName }} is ordered for {{ childSayName }} on
                {{
                  date: this.formatDate(date3p, multilang.t('assets.language')),
                }}
                .
              </Trans>
            );
            break;

          default:
            break;
        }
        break;

      case 4: // delivery to ngo, delivery to child
        switch (type) {
          case 0: // service (s4)
            image = multilang.t('report.s4.img');
            title = (
              <Trans i18nKey="report.s4.title">
                {{ childSayName }}’s {{ needName }} has been paid for
              </Trans>
            );
            paragraph = (
              <Trans i18nKey="report.s4.paragraph">
                The amount of {{ needCost: prettyCost }} Tomans for{' '}
                {{ childSayName }}’s {{ needName }}, has been paid by the NGO on
                {{
                  date: this.formatDate(
                    date5p4s,
                    multilang.t('assets.language')
                  ),
                }}
                .
              </Trans>
            );
            break;

          case 1: // product (p4)
            swId = true;
            image = multilang.t('report.p4.img');
            title = multilang.t('report.p4.title');
            paragraph = (
              <Trans i18nKey="report.p4.paragraph">
                On{' '}
                {{
                  date: this.formatDate(
                    date4p3s,
                    multilang.t('assets.language')
                  ),
                }}{' '}
                {{ needName }} is delivered to the NGO.
              </Trans>
            );
            break;

          default:
            break;
        }
        break;

      case 5: // delivery to child (p5)
        image = multilang.t('report.p5.img');
        title = (
          <Trans i18nKey="report.p5.title">
            Product delivered to {{ childSayName }}
          </Trans>
        );
        paragraph = (
          <Trans i18nKey="report.p5.paragraph">
            {{ needName }} is delivered to {{ childSayName }} on
            {{
              date: this.formatDate(date5p4s, multilang.t('assets.language')),
            }}
            .
          </Trans>
        );
        break;

      default:
        break;
    }

    return this.reportTemplate(
      image,
      title,
      paragraph,
      swId,
      socialWorkerCode,
      showDkc,
      dkcNumber
    );
  };

  renderButton = () => {
    if (this.state.status === 4 && this.state.type === 1) {
      return this.state.receipts.map((receipt) => (
        <div className="buttonWrapper" key={receipt.id}>
          <a
            href={receipt.attachment}
            target="_blank"
            className="defaultButton"
            rel="noreferrer"
          >
            {multilang.t('report.download')}
          </a>
        </div>
      ));
    }
  };

  render() {
    const { loading, height } = this.state;
    const { classes } = this.props;

    if (!loading)
      return (
        <div className={classes.root2}>
          <CircularProgress />
        </div>
      );

    return (
      <Protected>
        <div style={{ minHeight: height, overflowY: 'scroll' }}>
          {this.renderReport()}
          {this.renderButton()}
        </div>
      </Protected>
    );
  }
}

export default withStyles(styles)(Report);

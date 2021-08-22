webpackHotUpdate("main",{

/***/ "./src/components/child/ChildNeed.jsx":
/*!********************************************!*\
  !*** ./src/components/child/ChildNeed.jsx ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__react_refresh_utils__, __react_refresh_error_overlay__) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChildNeedCard; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core */ "./node_modules/@material-ui/core/index.js");
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-i18next */ "./node_modules/react-i18next/dist/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions_childAction__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../actions/childAction */ "./src/actions/childAction.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-dev-runtime */ "./node_modules/react/jsx-dev-runtime.js");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__);
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-scripts/node_modules/react-refresh/runtime.js */ "./node_modules/react-scripts/node_modules/react-refresh/runtime.js");
__webpack_require__.$Refresh$.setup(module.i);

var _jsxFileName = "/home/linux1/Documents/Code/SAY/2.0.0/front-end-v2/src/components/child/ChildNeed.jsx",
    _s = __webpack_require__.$Refresh$.signature();

/* eslint-disable no-plusplus */








const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["makeStyles"])(() => ({
  imageUrl: {
    width: 45,
    height: 45,
    backgroundColor: '#FDE1C1',
    margin: 'auto'
  },
  theCard: {
    padding: 5,
    minHeight: '60px'
  },
  needName: {
    textAlign: 'right',
    padding: 5,
    margin: 'auto'
  },
  actionArea: {
    width: '100%',
    margin: 0,
    padding: 0
  },
  chip: {
    border: 0,
    backgroundColor: 'white',
    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:focusVisible': {
      backgroundColor: 'red'
    },
    '&:hover': {
      backgroundColor: '#FFDFC1 !important'
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#bfeeff !important'
    }
  }
}));
function ChildNeedCard({
  theChild
}) {
  _s();

  const {
    t
  } = Object(react_i18next__WEBPACK_IMPORTED_MODULE_3__["useTranslation"])();
  const dispatch = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"])();
  const childNeeds = Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"])(state => state.childNeeds);
  const {
    theNeeds,
    success,
    loading
  } = childNeeds;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!success) {
      dispatch(Object(_actions_childAction__WEBPACK_IMPORTED_MODULE_5__["fetchChildNeeds"])(theChild.id));
    }
  }, [dispatch, success, theChild]);

  const handleNeedPage = () => {
    console.log('hi');
  };

  const categorizeNeeds = () => {
    const allNeeds = childNeeds.sort((a, b) => {
      if (!a.isDone && !b.isDone) {
        // Sorts needs by create date Ascending
        return new Date(a.created) - new Date(b.created);
      } // Sorts needs by done date Ascending


      return new Date(b.doneAt) - new Date(a.doneAt);
    });
    const needData = [[], [], [], [], [], []];

    for (let i = 0; i < allNeeds.length; i++) {
      if (allNeeds[i].isDone) {
        needData[5].push(allNeeds[i]);
      }
    }
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  const classes = useStyles();
  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["Fragment"], {
    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Box"], {
        sx: {
          overflowX: 'scroll',
          maxWidth: '90%',
          height: '50px'
        },
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Stack"], {
          direction: "row",
          spacing: 1,
          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], {
            label: "Clickable",
            onClick: handleClick,
            variant: "outlined",
            className: classes.chip
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 102,
            columnNumber: 13
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], {
            label: "Clickable",
            onClick: handleClick,
            variant: "outlined",
            className: classes.chip
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 108,
            columnNumber: 13
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], {
            className: classes.chip,
            label: "Clickable",
            onClick: handleClick
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 114,
            columnNumber: 13
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], {
            className: classes.chip,
            label: "Clickable",
            onClick: handleClick
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 119,
            columnNumber: 13
          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Chip"], {
            className: classes.chip,
            label: "Clickable",
            onClick: handleClick
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 124,
            columnNumber: 13
          }, this)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 101,
          columnNumber: 11
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 100,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 99,
      columnNumber: 7
    }, this), loading ? /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["Fragment"], {
      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CircularProgress"], {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 134,
        columnNumber: 11
      }, this)
    }, void 0, false) : /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Stack"], {
      direction: "column",
      spacing: 1,
      sx: {
        paddingLeft: 2,
        paddingRight: 2,
        textAlign: 'center',
        width: '100%'
      },
      children: theNeeds && theNeeds.needs.map(need => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Card"], {
        elevation: 4,
        className: classes.theCard,
        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["CardActionArea"], {
          className: classes.actionArea,
          onClick: () => handleNeedPage(need),
          children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
            container: true,
            item: true,
            direction: "row",
            justifyContent: "space-between",
            children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
              container: true,
              item: true,
              direction: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              xs: 7,
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
                item: true,
                xs: true,
                sx: {
                  display: 'flex'
                },
                children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
                  variant: "body1",
                  children: need.cost
                }, void 0, false, {
                  fileName: _jsxFileName,
                  lineNumber: 169,
                  columnNumber: 25
                }, this)
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 168,
                columnNumber: 23
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 160,
              columnNumber: 21
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
              item: true,
              xs: 3,
              className: classes.needName,
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Typography"], {
                variant: "body1",
                children: need.progress
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 173,
                columnNumber: 23
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 172,
              columnNumber: 21
            }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Grid"], {
              item: true,
              xs: 2,
              children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_6__["jsxDEV"])(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__["Avatar"], {
                src: need.imageUrl,
                className: classes.imageUrl
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 176,
                columnNumber: 23
              }, this)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 175,
              columnNumber: 21
            }, this)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 154,
            columnNumber: 19
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 150,
          columnNumber: 17
        }, this)
      }, need.id, false, {
        fileName: _jsxFileName,
        lineNumber: 149,
        columnNumber: 15
      }, this))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 137,
      columnNumber: 9
    }, this)]
  }, void 0, true);
}

_s(ChildNeedCard, "w81pw1ZUTNVFVPjZjzczaFuqWmk=", false, function () {
  return [react_i18next__WEBPACK_IMPORTED_MODULE_3__["useTranslation"], react_redux__WEBPACK_IMPORTED_MODULE_4__["useDispatch"], react_redux__WEBPACK_IMPORTED_MODULE_4__["useSelector"], useStyles];
});

_c = ChildNeedCard;
ChildNeedCard.propTypes = {
  theChild: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};

var _c;

__webpack_require__.$Refresh$.register(_c, "ChildNeedCard");

const currentExports = __react_refresh_utils__.getModuleExports(module.i);
__react_refresh_utils__.registerExportsForReactRefresh(currentExports, module.i);

if (true) {
  const isHotUpdate = !!module.hot.data;
  const prevExports = isHotUpdate ? module.hot.data.prevExports : null;

  if (__react_refresh_utils__.isReactRefreshBoundary(currentExports)) {
    module.hot.dispose(
      /**
       * A callback to performs a full refresh if React has unrecoverable errors,
       * and also caches the to-be-disposed module.
       * @param {*} data A hot module data object from Webpack HMR.
       * @returns {void}
       */
      function hotDisposeCallback(data) {
        // We have to mutate the data object to get data registered and cached
        data.prevExports = currentExports;
      }
    );
    module.hot.accept(
      /**
       * An error handler to allow self-recovering behaviours.
       * @param {Error} error An error occurred during evaluation of a module.
       * @returns {void}
       */
      function hotErrorHandler(error) {
        if (
          typeof __react_refresh_error_overlay__ !== 'undefined' &&
          __react_refresh_error_overlay__
        ) {
          __react_refresh_error_overlay__.handleRuntimeError(error);
        }

        if (typeof __react_refresh_test__ !== 'undefined' && __react_refresh_test__) {
          if (window.onHotAcceptError) {
            window.onHotAcceptError(error.message);
          }
        }

        __webpack_require__.c[module.i].hot.accept(hotErrorHandler);
      }
    );

    if (isHotUpdate) {
      if (
        __react_refresh_utils__.isReactRefreshBoundary(prevExports) &&
        __react_refresh_utils__.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)
      ) {
        module.hot.invalidate();
      } else {
        __react_refresh_utils__.enqueueUpdate(
          /**
           * A function to dismiss the error overlay after performing React refresh.
           * @returns {void}
           */
          function updateCallback() {
            if (
              typeof __react_refresh_error_overlay__ !== 'undefined' &&
              __react_refresh_error_overlay__
            ) {
              __react_refresh_error_overlay__.clearRuntimeErrors();
            }
          }
        );
      }
    }
  } else {
    if (isHotUpdate && __react_refresh_utils__.isReactRefreshBoundary(prevExports)) {
      module.hot.invalidate();
    }
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/react-scripts/node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/react-scripts/node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js"), __webpack_require__(/*! ./node_modules/react-dev-utils/refreshOverlayInterop.js */ "./node_modules/react-dev-utils/refreshOverlayInterop.js")))

/***/ })

})
//# sourceMappingURL=main.4313a37e1031d2f0ffa0.hot-update.js.map
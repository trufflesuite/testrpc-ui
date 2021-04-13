import React, { Component } from "react";

import KeyModal from "./KeyModal";

import OnlyIf from "../../../../../renderer/components/only-if/OnlyIf";
import FormattedFILValue from "../../components/formatted-fil-value/FormattedFILValue";
import KeyIcon from "../../../../../renderer/icons/key.svg";

class AccountList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showKeys: false,
      privateKey: "",
      accountAddress: "",
    };
  }

  showKeys = (accountAddress, privateKey) => {
    this.setState({
      showKeys: true,
      privateKey,
      accountAddress,
    });
  };

  onCloseModal = () => {
    this.setState({
      showKeys: false,
    });
  };

  _renderAccounts = () => {
    const self = this;
    return this.props.accounts.map((account, index) => {
      const balance = this.props.balances[account];
      return (
        <div className="AccountCard" key={`account-card-${index}`}>
          <div className="AddressAndBalance">
            <div className="AccountAddress">
              <div className="Label">ADDRESS</div>
              <div className="Value">
                <span>{account}</span>
              </div>
            </div>
            <div className="AccountBalance">
              <div className="Label">BALANCE</div>
              <div className="Value">
                { balance ? <FormattedFILValue
                  value={balance}
                /> : "" }
              </div>
            </div>
          </div>
          <div className="SecondaryInfo">
            <div className="MessageCount">
              <div className="Label">MSG COUNT</div>
              <div className="Value">{this.props.nonces[account]}</div>
            </div>
            <div className="AccountIndex">
              <div className="Label">INDEX</div>
              <div className="Value">{index}</div>
            </div>
            <span
              className="ShowKeys popover-container"
              onClick={() => {
                self.showKeys(
                  account,
                  // need to pass lower case account here because account is
                  // checksummed address
                  self.props.privateKeys[account.toLowerCase()],
                );
              }}
            >
              <KeyIcon />
              <span className="popover">Show Keys</span>
            </span>
            {/* <div className={Styles.AccountState}>
              {account.isUnlocked
                ? <Icon glyph={UnlockedIcon} size={24} className="isolate" />
                : <Icon glyph={LockedIcon} size={24} className="isolate" />}
            </div> */}
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="FilecoinAccountList">
        {this._renderAccounts()}
        <OnlyIf test={this.state.showKeys}>
          <KeyModal
            accountAddress={this.state.accountAddress}
            privateKey={this.state.privateKey}
            onCloseModal={this.onCloseModal}
          />
        </OnlyIf>
      </div>
    );
  }
}

export default AccountList;

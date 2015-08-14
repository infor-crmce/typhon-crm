define('crm/Views/OpportunityProduct/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/string', '../../Validator', 'argos/Edit', 'argos/Utility'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoString, _Validator, _argosEdit, _argosUtility) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _string = _interopRequireDefault(_dojoString);

  var _validator = _interopRequireDefault(_Validator);

  var _Edit = _interopRequireDefault(_argosEdit);

  var _Utility = _interopRequireDefault(_argosUtility);

  /**
   * @class crm.Views.OpportunityProduct.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Validator
   * @requires crm.Template
   */
  var __class = (0, _declare['default'])('crm.Views.OpportunityProduct.Edit', [_Edit['default']], {
    // Localization
    titleText: 'Opportunity Product',
    detailsText: 'Details',
    opportunityText: 'opportunity',
    productText: 'product',
    productFamilyText: 'product family',
    priceLevelText: 'price level',
    priceText: 'price',
    basePriceText: 'base price',
    discountText: 'discount %',
    adjustedPriceText: 'adjusted price',
    myAdjustedPriceText: 'user',
    baseAdjustedPriceText: 'base',
    quantityText: 'quantity',
    baseExtendedPriceText: 'base',
    extendedPriceText: 'extended price',
    extendedPriceSectionText: 'Extended Price',
    adjustedPriceSectionText: 'Adjusted Price',

    // View Properties
    entityName: 'Opportunity',
    id: 'opportunityproduct_edit',
    resourceKind: 'opportunityProducts',
    insertSecurity: 'Entities/Opportunity/Add',
    updateSecurity: 'Entities/Opportunity/Edit',
    querySelect: ['Opportunity/Description', 'Product/Name', 'Product/Family', 'Program', 'Price', 'Discount', 'AdjustedPrice', 'CalculatedPrice', 'Quantity', 'ExtendedPrice'],
    init: function init() {
      this.inherited(arguments);
      this.connect(this.fields.Product, 'onChange', this.onProductChange);
      this.connect(this.fields.Program, 'onChange', this.onProgramChange);
      this.connect(this.fields.Discount, 'onChange', this.onDiscountChange);
      this.connect(this.fields.CalculatedPrice, 'onChange', this.onAdjustedPriceChange);
      this.connect(this.fields.CalculatedPriceMine, 'onChange', this.onAdjustedPriceMineChange);
      this.connect(this.fields.Quantity, 'onChange', this.onQuantityChange);
    },
    setValues: function setValues(values) {
      this.inherited(arguments);
      this.fields.Program.setValue({
        '$key': '',
        'Program': values.Program
      });

      if (values.Discount > 0) {
        // transform the discount into a percentage number 0.10 to 10.00%
        this.fields.Discount.setValue(values.Discount * 100);
      }

      var myCode = App.getMyExchangeRate().code;
      var baseCode = App.getBaseExchangeRate().code;
      this.fields.Price.setCurrencyCode(baseCode);
      this.fields.CalculatedPrice.setCurrencyCode(baseCode);

      if (App.hasMultiCurrency()) {
        this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * values.CalculatedPrice);
        this.fields.CalculatedPriceMine.setCurrencyCode(myCode);
      }

      this.fields.ExtendedPrice.setCurrencyCode(baseCode);
      this._updateExtendedPrice();

      if (values.Product.Family !== null && values.Price !== null) {
        this._enableUI(true);
      } else {
        this._enableUI(false);
      }
    },
    _enableUI: function _enableUI(enable) {
      if (enable) {
        this.fields.Discount.enable();
        this.fields.Quantity.enable();
        this.fields.CalculatedPrice.enable();
        if (App.hasMultiCurrency()) {
          this.fields.CalculatedPriceMine.enable();
        }
      } else {
        this.fields.Discount.disable();
        this.fields.Quantity.disable();
        this.fields.CalculatedPrice.disable();
        if (App.hasMultiCurrency()) {
          this.fields.CalculatedPriceMine.disable();
        }
      }
    },
    _getMyRate: function _getMyRate() {
      return App.getMyExchangeRate().rate;
    },
    getValues: function getValues() {
      var o = this.inherited(arguments);
      o.Program = o.Program.Program;

      /*
       * 'AdjustedPrice' is a lie. The underlying database field is actually PRICEADJUSTED and
       * is a boolean, not a price that has been adjusted. Since we use the adjusted price to calculate
       * the discount %, we will remove it from getValues so we aren't trying to save the wrong data type when sending
       * the sdata request.
       */
      delete o.AdjustedPrice;
      delete o.CalculatedPriceMine;
      // transform the discount back into a decimal
      o.Discount = o.Discount / 100;

      return o;
    },
    applyContext: function applyContext() {
      var entry = this.options && this.options.selectedEntry;

      if (entry) {
        this.fields.Opportunity.setValue(entry);
      }
    },
    onProductChange: function onProductChange(value, field) {
      var selection = field && field.currentSelection;
      if (selection) {
        this.fields.ProductId.setValueNoTrigger(value.key);
        this.fields['Product.Family'].setValueNoTrigger(selection.Family);
        this.fields.Program.clearValue();

        this.fields.Price.setValueNoTrigger(selection.Price);
        this.fields.Discount.clearValue();
        this.fields.CalculatedPrice.setValueNoTrigger(selection.Price);

        if (App.hasMultiCurrency()) {
          this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * selection.Price);
        }
        this.fields.Quantity.setValueNoTrigger(1);
        this._updateExtendedPrice();
      }
    },
    onProgramChange: function onProgramChange(value, field) {
      var selection = field && field.currentSelection;
      if (selection) {
        this.fields.Price.setValueNoTrigger(selection.Price);
        this.fields.Discount.clearValue();
        this.fields.CalculatedPrice.setValueNoTrigger(selection.Price);
        if (App.hasMultiCurrency()) {
          this.fields.CalculatedPriceMine.setValueNoTrigger(this._getMyRate() * selection.Price);
        }
        this._updateExtendedPrice();
        this._enableUI(true);
      }
    },
    onDiscountChange: function onDiscountChange() {
      var price = parseFloat(this.fields.Price.getValue()) || 0;
      var discount = this.fields.Discount.getValue();

      var adjusted = this._calculateAdjustedPrice(price, discount);
      this.fields.CalculatedPrice.setValueNoTrigger(adjusted);

      this._updateAdjustedPrices(adjusted);
      this._updateExtendedPrice();
    },
    onAdjustedPriceChange: function onAdjustedPriceChange() {
      var price = parseFloat(this.fields.Price.getValue()) || 0;
      var adjusted = parseFloat(this.fields.CalculatedPrice.getValue()) || 0;

      var discount = this._calculateDiscount(price, adjusted);
      this.fields.Discount.setValueNoTrigger(discount);

      if (App.hasMultiCurrency()) {
        var myadjusted = this._getMyRate() * adjusted;
        this.fields.CalculatedPriceMine.setValueNoTrigger(myadjusted);
      }
      this._updateExtendedPrice();
    },
    onAdjustedPriceMineChange: function onAdjustedPriceMineChange() {
      var myadjusted = this.fields.CalculatedPriceMine.getValue();
      var price = this.fields.Price.getValue() || 0;

      var myrate = this._getMyRate();
      var myprice = price * myrate; // get the price in the users exchange rate

      var discount = this._calculateDiscount(myprice, myadjusted);
      this.fields.Discount.setValueNoTrigger(discount);

      var adjusted = this._calculateAdjustedPrice(price, discount);
      this.fields.CalculatedPrice.setValueNoTrigger(adjusted);

      this._updateExtendedPrice();
    },
    onQuantityChange: function onQuantityChange(value) {
      if (isNaN(value)) {
        this.fields.Quantity.setValueNoTrigger(0);
      }
      this._updateExtendedPrice();
    },
    _calculateDiscount: function _calculateDiscount(price, adjusted) {
      var discount = undefined;
      if (price === 0) {
        discount = 0.0;
      } else {
        discount = (1 - adjusted / price) * 100;
      }
      return discount;
    },
    _calculateAdjustedPrice: function _calculateAdjustedPrice(price, discount) {
      var adjusted = undefined;
      if (discount === 0) {
        adjusted = price;
      } else {
        adjusted = price - price * (discount / 100);
      }
      return adjusted;
    },
    _updateAdjustedPrices: function _updateAdjustedPrices(adjusted) {
      var myadjusted = undefined;
      this.fields.CalculatedPrice.setValueNoTrigger(adjusted);
      if (App.hasMultiCurrency()) {
        myadjusted = this._getMyRate() * adjusted;
        this.fields.CalculatedPriceMine.setValueNoTrigger(myadjusted);
      }
    },
    _updateExtendedPrice: function _updateExtendedPrice() {
      var quantity = parseFloat(this.fields.Quantity.getValue()) || 0;
      var adjusted = parseFloat(this.fields.CalculatedPrice.getValue()) || 0;
      var extended = adjusted * quantity;
      this.fields.ExtendedPrice.setValueNoTrigger(extended);
    },
    onUpdateCompleted: function onUpdateCompleted() {
      this._refreshOpportunityViews();
      this.inherited(arguments);
    },
    onInsertCompleted: function onInsertCompleted() {
      this._refreshOpportunityViews();
      this.inherited(arguments);
    },
    _refreshOpportunityViews: function _refreshOpportunityViews() {
      var views = [App.getView('opportunityproduct_related'), App.getView('opportunity_detail'), App.getView('opportunity_list')];

      _array['default'].forEach(views, function setViewRefreshRequired(view) {
        if (view) {
          view.refreshRequired = true;
        }
      }, this);
    },
    createLayout: function createLayout() {
      var details = {
        title: this.detailsText,
        name: 'OpportunityProductDetailsEdit',
        children: [{
          label: this.opportunityText,
          name: 'Opportunity',
          property: 'Opportunity',
          type: 'lookup',
          textProperty: 'Description',
          view: 'opportunity_related',
          validator: _validator['default'].exists
        }, {
          name: 'ProductId',
          property: 'ProductId',
          type: 'hidden'
        }, {
          label: this.productText,
          name: 'Product',
          property: 'Product',
          type: 'lookup',
          textProperty: 'Name',
          view: 'product_related',
          validator: _validator['default'].exists
        }, {
          label: this.productFamilyText,
          name: 'Product.Family',
          property: 'Product.Family',
          type: 'text',
          readonly: true
        }, {
          label: this.priceLevelText,
          name: 'Program',
          property: 'Program',
          textProperty: 'Program',
          type: 'lookup',
          view: 'productprogram_related',
          validator: _validator['default'].exists,
          where: (function where() {
            var val = this.fields.Product.getValue();
            return _string['default'].substitute('Product.Name eq "${0}"', [_Utility['default'].escapeSearchQuery(val.Name)]);
          }).bindDelegate(this)
        }, {
          label: App.hasMultiCurrency() ? this.basePriceText : this.priceText,
          name: 'Price',
          property: 'Price',
          type: 'multiCurrency',
          readonly: true
        }, {
          label: this.discountText,
          name: 'Discount',
          property: 'Discount',
          type: 'decimal',
          notificationTrigger: 'blur'
        }, {
          label: this.quantityText,
          name: 'Quantity',
          property: 'Quantity',
          type: 'decimal',
          notificationTrigger: 'blur'
        }]
      };

      if (!App.hasMultiCurrency()) {
        details.children.push({
          label: this.adjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          type: 'multiCurrency',
          notificationTrigger: 'blur'
        });
        details.children.push({
          label: this.extendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          type: 'multiCurrency',
          readonly: true
        });
      }

      var extendedPrice = {
        title: this.extendedPriceSectionText,
        name: 'OpportunityProductExtendedPriceEdit',
        children: [{
          label: this.baseExtendedPriceText,
          name: 'ExtendedPrice',
          property: 'ExtendedPrice',
          type: 'multiCurrency',
          readonly: true
        }]
      };

      var adjustedPrice = {
        title: this.adjustedPriceSectionText,
        name: 'OpportunityProductAdjustedPriceEdit',
        children: [{
          label: this.baseAdjustedPriceText,
          name: 'CalculatedPrice',
          property: 'CalculatedPrice',
          type: 'multiCurrency',
          notificationTrigger: 'blur'
        }, {
          label: this.myAdjustedPriceText,
          name: 'CalculatedPriceMine',
          property: 'CalculatedPriceMine',
          type: App.hasMultiCurrency() ? 'multiCurrency' : 'hidden',
          notificationTrigger: 'blur'
        }]
      };

      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(details);

      if (App.hasMultiCurrency()) {
        layout.push(adjustedPrice);
        layout.push(extendedPrice);
      }
      return layout;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.OpportunityProduct.Edit', __class);
  module.exports = __class;
});

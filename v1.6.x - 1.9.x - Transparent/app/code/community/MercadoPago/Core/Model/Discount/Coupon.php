<?php

class MercadoPago_Core_Model_Discount_Coupon
    extends Mage_Sales_Model_Quote_Address_Total_Abstract
{

    protected $_code = 'discount_coupon';

    public function collect(Mage_Sales_Model_Quote_Address $address)
    {
        if ($this->_getDiscountCondition($address)) {

            $amt = Mage::app()->getRequest()->getPost();
            parent::collect($address);

            $balance = $amt['mercadopago-discount-amount']*1;
            $address->setDiscountCouponAmount($balance);
            $address->setDiscountCouponAmount($balance);

            $this->_setAmount($balance);
            $this->_setBaseAmount($balance);

        }

        return $this;
    }

    public function fetch(Mage_Sales_Model_Quote_Address $address)
    {
        if ($this->_getDiscountCondition($address)) {
            if ($address->getDiscountCoupnAmount() > 0) {
                $address->addTotal(array(
                    'code'  => $this->getCode(),
                    'title' => Mage::helper('mercadopago')->__('Discount MercadoPago'),
                    'value' => $address->getDiscountCouponAmount()
                ));
            }
        }

        return $this;
    }

    protected function _getDiscountCondition($address)
    {
        $req = Mage::app()->getRequest()->getParam('total_amount');

        return (!empty($req) && $address->getAddressType() == 'shipping');

    }
}
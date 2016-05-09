<?php
/**
 * Studioforty9_AttributeButtons
 *
 * @category  Studioforty9
 * @package   Studioforty9_AttributeButtons
 * @author    StudioForty9 <info@studioforty9.com>
 * @copyright 2016 StudioForty9 (http://www.studioforty9.com)
 * @license   https://github.com/studioforty9/attribute-buttons/blob/master/LICENCE BSD
 * @version   0.0.1
 * @link      https://github.com/studioforty9/attribute-buttons
 */

/**
 * Studioforty9_AttributeButtons_Block_Script
 *
 * @category   Studioforty9
 * @package    Studioforty9_AttributeButtons
 * @subpackage Block
 */
class Studioforty9_AttributeButtons_Block_Script extends Mage_Core_Block_Template
{
    /**
     * Determine whether the module is enabled or not.
     *
     * @return bool
     */
    public function isEnabled()
    {
        return $this->getHelper()->isEnabled();
    }

    /**
     * Get the attributes as a DOM selector string.
     *
     * @return string
     */
    public function getAttributes()
    {
        return $this->getHelper()->getAttributesArray();
    }

    /**
     * Get the module helper.
     *
     * @return Studioforty9_AttributeButtons_Helper_Data
     */
    public function getHelper()
    {
        return Mage::helper('studioforty9_attributebuttons');
    }
}

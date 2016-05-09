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
 * Studioforty9_AttributeButtons_Helper_Data
 *
 * @category   Studioforty9
 * @package    Studioforty9_AttributeButtons
 * @subpackage Helper
 */
class Studioforty9_AttributeButtons_Helper_Data extends Mage_Core_Helper_Abstract
{
    const CONFIG_ENABLED = 'studioforty9_attributebuttons/settings/enabled';
    const CONFIG_ATTRIBUTES = 'studioforty9_attributebuttons/settings/attributes';

    /**
     * Determine whether the module is enabled or not.
     *
     * @return bool
     */
    public function isEnabled()
    {
        return Mage::getStoreConfigFlag(self::CONFIG_ENABLED);
    }

    /**
     * Determine whether the module is enabled or not.
     *
     * @return bool
     */
    public function getAttributes()
    {
        return Mage::getStoreConfig(self::CONFIG_ATTRIBUTES);
    }

    /**
     * Determine whether the module is enabled or not.
     *
     * @return bool
     */
    public function getAttributesArray()
    {
        return explode(',', $this->getAttributes());
    }
}

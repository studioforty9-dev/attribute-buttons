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
 * Studioforty9_AttributeButtons_Model_System_Config_Source_Attributes
 *
 * @category   Studioforty9
 * @package    Studioforty9_AttributeButtons
 * @subpackage Model
 */
class Studioforty9_AttributeButtons_Model_System_Config_Source_Attributes extends Mage_Core_Helper_Abstract
{
    /**
     * Determine whether the module is enabled or not.
     *
     * @return bool
     */
    public function toOptionArray()
    {
        $query = 'SELECT `eav`.`attribute_id`, `eav`.`frontend_label`
FROM `eav_attribute` eav
LEFT JOIN `catalog_eav_attribute` cea ON `eav`.`attribute_id`=`cea`.`attribute_id`
WHERE `cea`.`is_configurable`=1
AND `eav`.`frontend_label` !=\'\'
AND `eav`.`entity_type_id`=4
AND `eav`.`is_user_defined`=1';

        $resource = Mage::getSingleton('core/resource');
        $readConnection = $resource->getConnection('core_read');
        $attributes = $readConnection->fetchAll($query);

        $options = array();
        foreach ($attributes as $attribute) {
            $options[] = array(
                'value' => $attribute['attribute_id'],
                'label' => $attribute['frontend_label']
            );
        }

        return $options;
    }
}

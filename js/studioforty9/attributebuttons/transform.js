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

Element.addMethods({
    /**
     * Trigger an event programmatically.
     *
     * @param {String} eventName
     * @returns {boolean}
     */
    triggerEvent: function(eventName) {
        if (document.createEvent) {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(eventName, true, true);
            return this.dispatchEvent(evt);
        }

        if (this.fireEvent) {
            return this.fireEvent('on' + eventName);
        }
    }
});

AttributeButtons = Class.create({
    /**
     * @param {Boolean}
     */
    transformed: false,

    /**
     * @param {Object} settings
     */
    settings: {
        'containerId': 'size-selectors',
        'activeClass': 'size-selector-active',
        'labelClass': 'size-selector-label',
        'radioClass': 'size-selector-radio'
    },

    /**
     * Initializes the class.
     *
     * @param {string} attribute
     * @param {object} options
     */
    initialize: function(attribute, options) {
        if (options) {
            this.settings = Object.extend(options, this.settings);
        }
        this.element = $(attribute);
        this.bindEvents();
        this.transform();
    },

    /**
     * Binds event listeners.
     */
    bindEvents: function() {
        $$('.super-attribute-select').invoke('observe', 'change', this.onChange.bind(this));
    },

    /**
     * Listens for changes on other super attribute select fields.
     */
    onChange: function() {
        $(this.settings.containerId).remove();
        this.element.value = '';
        this.transform();
    },

    /**
     * Transform the select options to clickable buttons.
     */
    transform: function() {
        var parent = this.element.up(),
            options = this.element.select('option'),
            container = this._getContainer();

        if (!options.length) return;

        try {
            parent.insert({'top': container});
            this.hide();
            options.map((function(option) {
                var label;
                if (this._canTransform(option)) {
                    label = this._getLabel(option);
                    label.update(option.innerHTML);
                    if (option.readAttribute('disabled')) {
                        label.addClassName('disabled');
                    }
                    label.on('click', (function(e) {
                        e.preventDefault();
                        this._onLabelClick(option, parent, label)
                    }).bind(this));
                    container.insert({'bottom': label});
                }
            }).bind(this));
            this.transformed = true;
        } catch (e) {
            this.transformed = false;
            this.show();
        }
    },

    /**
     * Hide the select element.
     *
     * @returns {Element}
     */
    hide: function() {
        return this.element.setStyle({
            display: 'inline',
            height: '0px',
            visibility: 'hidden',
            width: '1px',
            fontSize: '1px',
            maxWidth: '1px',
            lineHeight: '1px',
            maxHeight: '1px',
            position: 'absolute',
            zIndex: -1
        });
    },

    /**
     * Show the select element.
     *
     * @returns {Element}
     */
    show: function() {
        return this.element.setStyle({
            display: 'block',
            height: 'auto',
            visibility: 'visible',
            width: '330px',
            fontSize: '14px',
            maxWidth: '100%',
            lineHeight: 'auto',
            maxHeight: '100%',
            position: 'static',
            zIndex: 'auto'
        });
    },

    /* Private Methods */

    /**
     * Create the container element.
     *
     * @returns Element
     * @private
     */
    _getContainer: function() {
        return new Element('div', {
            'id': this.settings.containerId
        });
    },

    /**
     * Determines if we can transform the select options.
     *
     * @param {Element} option
     * @returns {boolean}
     * @private
     */
    _canTransform: function(option) {
        return option.value && option.value !== option.innerHTML;
    },

    /**
     * Creates the label element to represent the option.
     *
     * @returns Element
     * @private
     */
    _getLabel: function() {
        return new Element('label', {
            'class': this.settings.labelClass
        });
    },

    /**
     * Label on-click handler.
     *
     * @param {Element} option
     * @param {Element} parent
     * @param {Element} label
     * @returns {boolean}
     * @private
     */
    _onLabelClick: function(option, parent, label) {
        if (option.readAttribute('disabled'))  return false;
        // Cache the active class
        var cls = this.settings.activeClass
        // Remove active classes on all other labels
        parent.select('.' + this.settings.labelClass).map((function(el) {
            el.removeClassName(cls);
        }).bind(this));
        // Toggle active class on this label
        label.toggleClassName(cls, label.hasClassName(cls));
        // Select the option
        option.selected = true;
        // Trigger the change
        this.element.triggerEvent('change');
    }
});

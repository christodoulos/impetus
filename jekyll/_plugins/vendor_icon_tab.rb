module Jekyll
    class VendorIconTag < Liquid::Tag
      def initialize(tag_name, input, tokens)
        super
        @params = input.split
        @vendor = @params[0]
        @icon = @params[1]
        @url = @params[2]
        @title = @params[3..].join(' ')
      end
  
      def render(context)
        case @vendor
        when 'remix'
          %Q(<a href="#{@url}" title="#{@title}"><strong><i class="ri-#{@icon}"></i></strong></a>)
        when 'material'
          %Q(<a href="#{@url}" title="#{@title}"><strong><i class="material-icons">#{@icon}</i></strong></a>)
        when 'unicons'
          %Q(<a href="#{@url}" title="#{@title}"><strong><i class="uil #{@icon}"></i></strong></a>)
        # Add more vendors here as needed
        else
          "Invalid vendor"
        end
      end
    end
  end
  
  Liquid::Template.register_tag('vendor_icon', Jekyll::VendorIconTag)
  
package com.ssafy.marathon.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/webSocket")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        서버가 /sub에게 메세지 보내기
        registry.enableSimpleBroker("/chat", "/question", "/sketch", "/preset", "/image", "/wordChain");
//        /pub이 붙은 애들인 모두 MessageMapping으로 바운딩
        registry.setApplicationDestinationPrefixes("/");
    }
}
